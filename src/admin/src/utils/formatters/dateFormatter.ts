export const dateFormatter = (date: string) => {
  return new Date(date)
    .toLocaleDateString()
    .split("/")
    .map((datePart) => datePart.padStart(2, "0"))
    .join("/");
};
