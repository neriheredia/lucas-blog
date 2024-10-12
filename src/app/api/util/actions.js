"use server";

import { getUrl } from "@/app/api/util/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function postData(formData, editorContent, imageUrl) {
  const rawFormData = Object.fromEntries(formData);

  rawFormData.summary = editorContent;
  if (imageUrl) {
    rawFormData.imageUrl = imageUrl;
  }

  const url = await getUrl();

  const fetchData = await fetch(`${url}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });

  if (!fetchData.ok) {
    throw new Error("Error al crear el post");
  }

  revalidatePath("/blog");
  redirect("/blog");
}

export async function sendEmail(formData) {
  const rawFormData = Object.fromEntries(formData);

  const url = await getUrl();

  const fetchData = await fetch(`${url}/api/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });

  if (!fetchData.ok) {
    throw new Error("Error al enviar el email");
  }

  redirect("/home");
}

export async function postImage(fileData) {
  const uint8Array = new Uint8Array(fileData.data);
  const blob = new Blob([uint8Array], { type: fileData.type });
  const url = await getUrl();
  const fetchData = await fetch(`${url}/api/image?filename=${fileData.name}`, {
    method: "POST",
    body: blob,
  });

  if (!fetchData.ok) {
    throw new Error("Error al subir la imagen");
  }

  const response = await fetchData.json();

  return response;
}

export const getDataById = async (path, id) => {
  const url = await getUrl();
  const fetchData = await fetch(`${url}/api/${path}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!fetchData.ok) {
    throw new Error("Error al obtener los post");
  }

  const response = await fetchData.json();
  return response;
};

export const deleteData = async (path) => {
  const url = await getUrl();
  const deleteData = await fetch(`${url}/api/${path}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!deleteData.ok) {
    throw new Error("Error al eliminar los posts");
  }

  const response = await deleteData.json();
  return response;
};

export const deleteDataById = async (path, id) => {
  const url = await getUrl();
  const deleteData = await fetch(`${url}/api/${path}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!deleteData.ok) {
    throw new Error("Error al eliminar el post");
  }

  revalidatePath("/blog");
  redirect("/blog");
};

export const getData = async (path) => {
  const url = await getUrl();
  const fetchData = await fetch(`${url}/api/${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!fetchData.ok) {
    throw new Error("Error al obtener los posts");
  }

  const response = await fetchData.json();
  return response;
};
