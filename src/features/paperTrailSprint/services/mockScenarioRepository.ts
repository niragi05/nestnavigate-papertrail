import { getScenarioById } from "@/features/paperTrailSprint/data/scenarios";

export const mockScenarioRepository = {
  async getById(id: string) {
    return Promise.resolve(getScenarioById(id));
  }
};
