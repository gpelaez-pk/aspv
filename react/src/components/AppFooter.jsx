import React from "react"

function AppFooter() {

	return (
		<div className="copyrightLabel">
			<img src={require('../img/prokarma_icon_black.svg')} alt="ProKarma"></img>
			© 2019 ProKarma |
			<a href="https://prokarma.com/privacy-policy/"> Privacy Policy </a>
		</div>
	)
}

export default AppFooter