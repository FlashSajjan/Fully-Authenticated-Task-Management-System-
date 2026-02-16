export const CreateTodoDTO = (body) => {
  const { title, description, dueDate, category } = body;

  if (!title) throw new Error("Title is required");
  if (title.length > 100) throw new Error("Title too long");
  if (description && description.length > 500) {
    throw new Error("Description too long");
  }

  return {
    title,
    description,
    dueDate: dueDate ? new Date(dueDate) : undefined,
    category
  };
};

export const UpdateTodoDTO = (body) => {
  const allowedFields = ["title", "description", "dueDate", "category", "completed"];
  const update = {};

  allowedFields.forEach((field) => {
    if (body[field] !== undefined) {
      update[field] = body[field];
    }
  });

  return update;
};
