import { Request, Response } from "express";

import templateService from "../services/template.service";
import { matchedData } from "express-validator";
import { TemplateModel } from "../models/template.model";

const getAll = async (req: Request, res: Response) => {
  res.send(templateService.getAll());
};

const create = async (req: Request, res: Response) => {
  const dataReq = matchedData(req) as TemplateModel;
  const result = await templateService.create(dataReq);
  res.send(result);
};

const update = async (req: Request, res: Response) => {
  const dataReq = matchedData(req) as TemplateModel & { id: string };

  const { id, ...body } = dataReq;

  res.send(templateService.update(id, body));
};

const remove = async (req: Request, res: Response) => {
  const dataReq = matchedData(req);

  res.send(templateService.remove());
};

export default {
  getAll,
  create,
  update,
  remove,
};
