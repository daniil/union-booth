import * as sapper from '@sapper/app';
import userSettings from 'utils/userSettings';

userSettings.init();

sapper.start({
	target: document.querySelector('#sapper')
});