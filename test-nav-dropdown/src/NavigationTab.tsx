import React from 'react'
import MicOnOff from './MicOnOff';
import Options from './Options';
import OptionsCopy from './OptionsCopy';
import ScreenShare from './ScreenShare';
import Logout from './Logout';

function NavigationTab() {
	return (
		<div className='Navigation'>
			<button>kilee</button>
			<MicOnOff />
			<ScreenShare />
			<OptionsCopy />
			{/* <button>나가기</button> */}
			<Logout />
			<button>올라오는거</button>
		</div>
	)
}

export default NavigationTab