// @flow
import { observable, action } from 'mobx';

import db from '../lib/db';

import type { InitDataType } from '../lib/types';

class App {
  @observable initData: InitDataType = {};
  @observable overlay: boolean = false;
  @observable currentNavs = {
    outer: null,
    inner: null,
  };
  navigationRefs = {};
  menuRef: any = null;

  @action
  async fetchInitData() {
    const skills = await db().child('skills').once('value');
    const tableExperience = await db().child('tableExperience').once('value');
    const things = await db().child('things').once('value');
    const islands = await db().child('islands').once('value');

    this.initData = {
      skills: skills.val(),
      tableExperience: tableExperience.val(),
      things: things.val(),
      islands: islands.val(),
    };
  }

  @action
  setNavigationRef(ref: any, type: string) {
    this.navigationRefs[type] = ref;
  }

  @action
  setMenuRef(ref: any) {
    this.menuRef = ref;
  }

  @action
  navigate(name: string, type: string = 'inner') {
    if (name === this.currentNavs[type]) return;

    const exists = this.navigationRefs[type]._navigation.state.routes
      .find(item => item.routeName === name);

    if (exists && name === 'Hero') {
      this.navigationRefs[type]._navigation.goBack('Hero');
    } else {
      this.navigationRefs[type]._navigation.navigate(name);
    }
    this.currentNavs[type] = name;
    if (type === 'outer') {
      this.currentNavs.inner = null;
    }
  }

  @action
  toggleMenu(value: boolean): void {
    if (value) {
      this.menuRef.open();
    } else {
      this.menuRef.close();
    }
  }

  @action
  toggleOverlay(value: boolean): void {
    this.overlay = value;
  }
}


export default new App();
