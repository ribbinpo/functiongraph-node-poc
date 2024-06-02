import { TemplateModel } from "../models/template.model";

const getAll = () => {
  return "GET /templates";
}

const create = async (body: TemplateModel) => {
  return body;
}

const update = (id: string, body: TemplateModel) => {
  return "PUT /templates";
}

const remove = () => {
  return "DELETE /templates";
}

export default {
  getAll,
  create,
  update,
  remove
};