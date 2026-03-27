import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { dbConnect } from "@/lib/db/connect";
import { UserNotificationModel } from "@/models/userNotification.model";
import { Types } from "mongoose";

/**
 * GET /api/dashboard/inbox
 * Fetch all notifications for the current user
 */
export async function GET(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!Types.ObjectId.isValid(session.user.id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    await dbConnect();

    const notifications = await UserNotificationModel.find({
      recipient: session.user.id,
    })
      .sort({ createdAt: -1 })
      .lean();

    const mapped = notifications.map((n) => ({
      id: (n._id as Types.ObjectId).toString(),
      type: n.type,
      title: n.title,
      message: n.message,
      time: formatTimeAgo(n.createdAt as Date),
      isRead: n.isRead,
      link: n.link,
      createdAt: n.createdAt,
    }));

    return NextResponse.json({ notifications: mapped });
  } catch (err) {
    console.error("Inbox API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/dashboard/inbox
 * Mark notification(s) as read
 * Body: { id?: string, markAll?: boolean }
 */
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!Types.ObjectId.isValid(session.user.id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    await dbConnect();

    const body = await req.json().catch(() => ({}));
    const { id, markAll } = body;

    if (markAll) {
      await UserNotificationModel.updateMany(
        { recipient: session.user.id, isRead: false },
        { $set: { isRead: true, readAt: new Date() } }
      );
      return NextResponse.json({ success: true });
    }

    if (id && Types.ObjectId.isValid(id)) {
      const updated = await UserNotificationModel.findOneAndUpdate(
        { _id: id, recipient: session.user.id },
        { $set: { isRead: true, readAt: new Date() } },
        { new: true }
      );
      if (!updated) {
        return NextResponse.json({ error: "Notification not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Provide id or markAll: true" },
      { status: 400 }
    );
  } catch (err) {
    console.error("Inbox PATCH error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
