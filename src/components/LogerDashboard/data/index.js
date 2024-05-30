const columns = [
  { name: "Number Document", uid: "numberDocument", sortable: true },
  { name: "Name", uid: "name", sortable: true },
  { name: "Birth Date", uid: "birthDay", sortable: true },
  { name: "Number Phone", uid: "numberPhone" },
  { name: "Document Type", uid: "documentType", sortable: true },
  { name: "Gender", uid: "gender" },
  { name: "Status", uid: "status" },
  { name: "Date action", uid: "DataTransfer", sortable: true },
];

const statusOptions = [
  { name: "Created", uid: "created" },
  { name: "Edited", uid: "edited" },
  { name: "Deleted", uid: "deleted" },
];

const statusColorMap = {
  created: "success",
  edited: "warning",
  deleted: "danger",
};

const typeDocumentOptions = [
  { name: "Cedula Ciudadania", uid: "CC" },
  { name: "Tarjeta de identidad", uid: "TI" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "numberDocument",
  "name",
  "status",
  "DataTransfer",
];

export {
  columns,
  statusOptions,
  INITIAL_VISIBLE_COLUMNS,
  statusColorMap,
  typeDocumentOptions,
};
