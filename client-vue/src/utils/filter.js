export const userTypeFilter = (value) => {
  if (value === "1") {
    return "一级会员";
  } else if (value === "0") {
    return "普通会员";
  } else {
    return "";
  }
};
export const mgrTypeFilter = (value) => {
  if (value === "2") {
    return "二级管理员";
  } else if (value === "1") {
    return "系统管理员";
  } else {
    return "非管理员";
  }
};
