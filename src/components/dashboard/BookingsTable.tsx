"use client";

import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Search, Eye, Star, Plane } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";

export interface Booking {
  id: string;
  title: string;
  location: string;
  date: string;
  status: "upcoming" | "completed" | "cancelled";
  price: string;
  duration: string;
}

const STATUS_STYLES: Record<Booking["status"], string> = {
  upcoming: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
};

function StatusBadge({ status }: { status: Booking["status"] }) {
  return (
    <Badge
      variant="outline"
      className={cn("capitalize font-medium text-xs", STATUS_STYLES[status])}
    >
      {status}
    </Badge>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-3" aria-label="Loading bookings">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-40 flex-1" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      ))}
    </div>
  );
}

interface BookingsTableProps {
  bookings: Booking[];
  isLoading?: boolean;
}

export default function BookingsTable({ bookings, isLoading }: BookingsTableProps) {
  const { data: session } = useSession();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = useMemo(() => {
    if (statusFilter === "all") return bookings;
    return bookings.filter((b) => b.status === statusFilter);
  }, [bookings, statusFilter]);

  const columns = useMemo<ColumnDef<Booking>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Booking ID",
        cell: ({ row }) => (
          <span className="font-mono text-xs text-slate-500">#{row.getValue("id")}</span>
        ),
      },
      {
        accessorKey: "title",
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 text-left hover:text-slate-900 transition-colors"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            aria-label="Sort by destination"
          >
            Destination
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        ),
        cell: ({ row }) => (
          <div>
            <p className="font-medium text-slate-900 text-sm">{row.getValue("title")}</p>
            <p className="text-xs text-slate-500">{row.original.location}</p>
          </div>
        ),
      },
      {
        accessorKey: "date",
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 hover:text-slate-900 transition-colors"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            aria-label="Sort by date"
          >
            Date
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        ),
        cell: ({ row }) => (
          <span className="text-sm text-slate-600">{row.getValue("date")}</span>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => (
          <span className="text-sm font-medium text-slate-900">{row.getValue("price")}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
        filterFn: (row, _, filterValue) =>
          filterValue === "all" || row.getValue("status") === filterValue,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label={`Actions for booking ${row.original.id}`}
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                className="gap-2"
                onClick={() => {
                  setSelectedBooking(row.original);
                  setIsModalOpen(true);
                }}
              >
                <Eye className="w-4 h-4" /> View Details
              </DropdownMenuItem>
              {row.original.status === "completed" && (
                <DropdownMenuItem className="gap-2">
                  <Star className="w-4 h-4" /> Write Review
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const statusCounts = useMemo(
    () => ({
      all: bookings.length,
      upcoming: bookings.filter((b) => b.status === "upcoming").length,
      completed: bookings.filter((b) => b.status === "completed").length,
      cancelled: bookings.filter((b) => b.status === "cancelled").length,
    }),
    [bookings]
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200">
      {/* Table header */}
      <div className="px-6 py-4 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900">My Bookings</h2>
            <p className="text-sm text-slate-500">{bookings.length} total bookings</p>
          </div>

          <div className="flex items-center gap-2 sm:ml-auto flex-wrap">
            {/* Status filter tabs */}
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
              {(["all", "upcoming", "completed", "cancelled"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  aria-pressed={statusFilter === s}
                  className={cn(
                    "px-3 py-1 rounded-md text-xs font-medium transition-colors capitalize",
                    statusFilter === s
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  {s} ({statusCounts[s]})
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <Input
                placeholder="Search bookings…"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-8 h-8 w-44 text-xs border-slate-200"
                aria-label="Search bookings"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id} className="hover:bg-transparent border-slate-200">
                    {hg.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-xs font-medium text-slate-500 uppercase tracking-wide h-10"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="border-slate-100 hover:bg-slate-50/50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-3.5">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <Plane className="h-8 w-8 text-slate-300" />
                        <p className="text-sm font-medium">No bookings found</p>
                        <p className="text-xs">Try adjusting your filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination Controls */}
          {table.getPageCount() > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
              <div className="text-sm text-slate-500">
                Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, filteredData.length)} of {filteredData.length} entries
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="text-xs h-8"
                >
                  Previous
                </Button>
                <div className="text-xs font-medium text-slate-700 mx-2">
                  Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="text-xs h-8"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Booking Details Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Booking Details"
      >
        {selectedBooking && (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-slate-900">{selectedBooking.title}</h3>
                <p className="text-sm text-slate-500">{selectedBooking.location}</p>
              </div>
              <StatusBadge status={selectedBooking.status} />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-500 mb-1">Booking ID</p>
                <p className="text-sm font-mono text-slate-900">#{selectedBooking.id}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Date</p>
                <p className="text-sm font-medium text-slate-900">{selectedBooking.date}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Duration</p>
                <p className="text-sm font-medium text-slate-900">{selectedBooking.duration || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Total Price</p>
                <p className="text-sm font-medium text-emerald-600">{selectedBooking.price}</p>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Close</Button>
              <Link 
                href={`/dashboard?role=${(session?.user as any)?.role || 'traveler'}&id=${session?.user?.id}&page=booking-details&bookingId=${selectedBooking.id}`}
                onClick={() => setIsModalOpen(false)}
              >
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-md">
                  View Full Details
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
