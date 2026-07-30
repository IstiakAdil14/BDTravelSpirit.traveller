// Utility type to extract enum values
type EnumValues<T> = T[keyof T];

/**
 * Enum for article publication status
 */
export enum ARTICLE_STATUS {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}
export type ArticleStatus = EnumValues<typeof ARTICLE_STATUS>;

/**
 * Enum for article type (single vs multi-destination, etc.)
 */
export enum ARTICLE_TYPE {
  SINGLE_DESTINATION = "single_destination",
  MULTI_DESTINATION = "multi_destination",
  GENERAL_TIPS = "general_tips",
}
export type ArticleType = EnumValues<typeof ARTICLE_TYPE>;

export enum ARTICLE_RICH_TEXT_BLOCK_TYPE {
  PARAGRAPH = "paragraph",
  HEADING = "heading",
  IMAGE = "image",
  LINK = "link",
}
export type ArticleRichTextBlockType = `${ARTICLE_RICH_TEXT_BLOCK_TYPE}`;

export enum FAQ_CATEGORY {
  GENERAL = "general",
  SAFETY = "safety",
  TRANSPORT = "transport",
  ACCOMMODATION = "accommodation",
  FOOD = "food",
}
export type FaqCategory = `${FAQ_CATEGORY}`;

export enum FOOD_RECO_SPICE_TYPE {
  NONE = "none",
  MILD = "mild",
  MEDIUM = "medium",
  HOT = "hot",
  EXTRA_HOT = "extra_hot",
}
export type FoodRecoSpiceType = `${FOOD_RECO_SPICE_TYPE}`;