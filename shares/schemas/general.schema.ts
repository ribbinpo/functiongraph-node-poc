import { body, param, query } from "express-validator";

export const pagination = () => {
  return [
    query("page").default(1).isInt().toInt(),
    query("limit").default(10).isInt().toInt(),
    query("sort").isString().optional(),
    query("order").default("asc").isIn(["asc", "desc"]),
    query("search").isString().optional(),
    query("isActive").isBoolean().optional().toBoolean(),
    query("includeDeleted").default(false).isBoolean().toBoolean(),
    query("currentLang").isString().default("en").isIn(["en", "th"]),
  ];
};

export interface IPagination {
  page: number;
  limit: number;
  sort?: string;
  currentLang?: string | "en" | "th";
  order: string;
  search?: string;
  isActive?: boolean;
  includeDeleted: boolean;
}

export const handlePagination = (
  dataReq: IPagination,
  searchGlobalProperty?: string[],
  searchLangProperty?: string[],
  sortGlobalProperty?: string[],
  sortLangProperty?: string[]
) => {
  const match = [];
  const sort = [];
  if (dataReq.hasOwnProperty("isActive")) {
    match.push({ isActive: dataReq.isActive });
  }
  if (dataReq.hasOwnProperty("search")) {
    const searchGlobalList =
      searchGlobalProperty?.reduce(
        (acc, p) => {
          return [...acc, { [p]: { $regex: dataReq.search, $options: "i" } }];
        },
        [] as {
          [x: string]: {
            $regex: string | undefined;
            $options: string;
          };
        }[]
      ) || [];
    const searchLangList =
      searchLangProperty?.reduce(
        (acc, p) => {
          const list = ["en", "th"].map((l) => ({
            [`lang.${l}.${p}`]: { $regex: dataReq.search, $options: "i" },
          }));
          return [...acc, ...list];
        },
        [] as {
          [x: string]: {
            $regex: string | undefined;
            $options: string;
          };
        }[]
      ) || [];
    match.push({
      $or: [...searchLangList, ...searchGlobalList],
    });
  }

  if (dataReq.hasOwnProperty("sort") && dataReq.sort && dataReq.currentLang) {
    const _sort = dataReq.order === "asc" ? 1 : -1;
    if (sortGlobalProperty?.includes(dataReq.sort)) {
      sort.push({ $sort: { [dataReq.sort]: _sort } });
    } else if (sortLangProperty?.includes(dataReq.sort)) {
      sort.push({
        $sort: {
          [`lang.${dataReq.currentLang}.${dataReq.sort}`]: _sort,
        },
      });
    }
  }
  if (!(dataReq.hasOwnProperty("includeDeleted") && dataReq.includeDeleted)) {
    match.push({ deletedAt: { $exists: false } });
  }
  return {
    match,
    sort,
  };
};

export const setActive = () => {
  return [
    param("id").isMongoId().notEmpty(),
    body("isActive").isBoolean().notEmpty(),
  ];
};

export const deleteMany = () => {
  return [
    body("ids").isArray().notEmpty(),
    body("ids.*").isMongoId().notEmpty(),
  ];
};
