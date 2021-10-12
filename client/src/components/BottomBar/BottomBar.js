import React, { useCallback } from 'react'
import styled from 'styled-components'

const BottomBar = ({
	clickChat,
	goToBack,
	toggleCameraAudio,
	userVideoAudio,
	clickScreenSharing,
	screenShare,
	videoDevices,
	showVideoDevices,
	setShowVideoDevices,
}) => {
	const handleToggle = useCallback(
		(e) => {
			setShowVideoDevices((state) => !state)
		},
		[setShowVideoDevices]
	)
	console.log(userVideoAudio)

	return (
		<Bar>
			<Left>
				<CameraButton onClick={toggleCameraAudio} data-switch="video">
					<div>
						{userVideoAudio.video ? (
							<FaIcon className="fas fa-video"></FaIcon>
						) : (
							<FaIcon className="fas fa-video-slash"></FaIcon>
						)}
					</div>
					{userVideoAudio.video ? 'Tắt camera' : 'Bật camera'}
				</CameraButton>
				{/* {showVideoDevices && (
					<SwitchList>
						{videoDevices.length > 0 &&
							videoDevices.map((device) => {
								console.log(device)
								return <div>{device.label}</div>
							})}
						<div>Switch Camera</div>
					</SwitchList>
				)} */}
				{/* <SwitchMenu onClick={handleToggle}>
					<i className="fas fa-angle-up"></i>
				</SwitchMenu> */}
				<CameraButton onClick={toggleCameraAudio} data-switch="audio">
					<div>
						{userVideoAudio.audio ? (
							<FaIcon className="fas fa-microphone"></FaIcon>
						) : (
							<FaIcon className="fas fa-microphone-slash"></FaIcon>
						)}
					</div>
					{userVideoAudio.audio ? 'Tắt mic' : 'Bật mic'}
				</CameraButton>
			</Left>
			<Center>
				<ChatButton onClick={clickChat}>
					<div>
						<FaIcon className="fas fa-comments"></FaIcon>
					</div>
					Nhắn tin
				</ChatButton>
				<ScreenButton onClick={clickScreenSharing}>
					<div>
						<FaIcon
							className={`fas fa-desktop ${screenShare ? 'sharing' : ''}`}
						></FaIcon>
					</div>
					Chia sẻ màn hình
				</ScreenButton>
			</Center>
			<Right>
				<StopButton onClick={goToBack}>Rời lớp</StopButton>
			</Right>
		</Bar>
	)
}

const Bar = styled.div`
	position: absolute;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 8%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 500;
	background-color: #1d2635;
	padding: 10px 0;
`
const Left = styled.div`
	display: flex;
	align-items: center;

	margin-left: 15px;
`

const Center = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
`

const Right = styled.div``

const ChatButton = styled.div`
	width: 75px;
	border: none;
	font-size: 0.9375rem;
	padding: 5px;

	:hover {
		cursor: pointer;
		border-radius: 15px;
	}

	* {
		pointer-events: none;
	}
`

const ScreenButton = styled.div`
	width: auto;
	border: none;
	font-size: 0.9375rem;
	padding: 5px;

	:hover {
		cursor: pointer;
		border-radius: 15px;
	}

	.sharing {
		color: #ee2560;
	}
`

const FaIcon = styled.i`
	width: 30px;
	font-size: calc(16px + 1vmin);
`

const StopButton = styled.div`
	border: none;
	padding: 0 15px 0 15px;
	font-size: 0.9375rem;
	font-weight: 600;
	line-height: 30px;
	margin-right: 15px;
	cursor: pointer;
	color: #f25483;
`

const CameraButton = styled.div`
	position: relative;
	width: 80px;
	border: none;
	border-radius: 5px;
	font-size: 0.9375rem;
	padding: 10px;

	:hover {
		cursor: pointer;
		border-radius: 15px;
	}

	* {
		pointer-events: none;
	}

	.fa-microphone-slash {
		color: #ee2560;
	}

	.fa-video-slash {
		color: #ee2560;
	}
`

const SwitchMenu = styled.div`
	display: flex;
	position: absolute;
	width: 20px;
	top: 7px;
	left: 80px;
	z-index: 1;

	:hover {
		cursor: pointer;
		border-radius: 15px;
	}

	* {
		pointer-events: none;
	}

	> i {
		width: 90%;
		font-size: calc(10px + 1vmin);
	}
`

const SwitchList = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: -115px;
	left: 80px;
	background-color: #4ea1d3;
	color: white;
	padding-top: 5px;
	padding-right: 10px;
	padding-bottom: 5px;
	padding-left: 10px;
	text-align: left;

	> div {
		font-size: 0.85rem;
		padding: 1px;
		margin-bottom: 5px;

		:not(:last-child):hover {
			background-color: #77b7dd;
			cursor: pointer;
		}
	}

	> div:last-child {
		border-top: 1px solid white;
		cursor: context-menu !important;
	}
`

export default BottomBar
