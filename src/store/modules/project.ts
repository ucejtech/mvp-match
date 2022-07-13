import { Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { IProject } from '../../types/models';
import { RootState } from '../store.interface';

export interface IProjectState {
  projects: IProject[];
  filterProjectId: string | null;
}

@Module({
  namespaced: true
})
export class ProjectModule extends VuexModule<IProjectState, RootState> {
  projects: IProjectState['projects'] = [];

  get projectList() {
    return this.projects;
  }

  @Mutation
  SET_PROJECTS(projects: IProject[]): void {
    this.projects = projects;
  }
}
