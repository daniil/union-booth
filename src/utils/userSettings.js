const userSettings = {
  init: () => {
    const settings = localStorage.getItem('userSettings');
    if (!settings) {
      localStorage.setItem('userSettings', JSON.stringify({
        cheatsheetCollapsed: false
      }));
    }
  },
  get: key => {
    const settings = localStorage.getItem('userSettings');
    return JSON.parse(settings)[key];
  },
  set: (key, value) => {
    const settings = JSON.parse(localStorage.getItem('userSettings'));
    settings[key] = value;
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }
};

export default userSettings;