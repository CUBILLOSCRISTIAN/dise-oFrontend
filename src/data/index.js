const columns = [
  { name: "Number Document", uid: "numberDocument", sortable: true },
  { name: "Name", uid: "name", sortable: true },
  { name: "Birth Date", uid: "birthDay", sortable: true },
  { name: "Number Phone", uid: "numberPhone" },
  { name: "Document Type", uid: "documentType", sortable: true },
  { name: "Gender", uid: "gender" },
  { name: "Actions", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Inactive", uid: "inactive" },
];

const INITIAL_VISIBLE_COLUMNS = ["numberDocument", "name", "gender", "actions"];

const statusColorMap = {
  active: "success",
  inactive: "danger",
};

export { columns, statusOptions, INITIAL_VISIBLE_COLUMNS, statusColorMap };
