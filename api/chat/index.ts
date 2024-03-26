import { AxiosInstance } from "axios";

export default (instance: AxiosInstance) => {
  return {
    async get_my_chats() {
      return instance.get("/chats/my");
    },
    async get_chat_messages(uuid: string) {
      return instance.get(`/chats/dialog/${uuid}`);
    },
  };
};
