import axios, { AxiosResponse } from "axios";

const baseUrl = "http://localhost:7007";

export const getTodos = async (): Promise<AxiosResponse<Todo[]>> => {
    try {
        const todos: AxiosResponse<Todo[]> = await axios.get(baseUrl + "/todo/");
        return todos;
    } catch (error) {
        throw new Error("error");
    }
};

export const createToDo = async (
    description: string
): Promise<AxiosResponse<Todo>> => {
    try {
        const data = { description: description };
        const saveTodo: AxiosResponse<Todo> = await axios.post(
            baseUrl + "/todo/",
            data
        );
        return saveTodo;
    } catch (error) {
        throw new Error("error");
    }
};

export const deleteToDo = async (id: string): Promise<AxiosResponse> => {
    try {
        const data = { id: id };
        const deleteTodo: AxiosResponse = await axios.delete(baseUrl + "/todo/", {
            data: data,
        });
        return deleteTodo;
    } catch (error) {
        throw new Error("error");
    }
};

export const updateToDo = async (
    id: string
): Promise<AxiosResponse> => {
    try {
        const data = { "id": id, "status": 1 };
        const deleteTodo: AxiosResponse = await axios.put(baseUrl + "/todo/",
            data,
        );
        return deleteTodo;
    } catch (error) {
        throw new Error("error");
    }
};
