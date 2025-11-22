// src/Components/ApiDemo.tsx
import axios from "axios";

export interface DemoProject {
  id: number;
  title: string;
  description: string;
  doc_url: string;
}

const BASE_URL = "http://127.0.0.1:8000/demo-projects";

export const fetchProjectsAPI = async () => {
  const res = await axios.get<DemoProject[]>(BASE_URL);
  return res.data;
};

export const addProjectAPI = async (formData: FormData) => {
  const res = await axios.post(BASE_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};

export const deleteProjectAPI = async (id: number) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
