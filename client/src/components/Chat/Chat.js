import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import socket from '../../socket'

const formatDate = (timeStamp) => {
	const thisDate = new Date(timeStamp)
	let hour = thisDate.getHours()
	let minute = thisDate.getMinutes()
	let currDate = thisDate.toLocaleDateString('vi-VN', {
		timeZone: 'UTC',
	})

	if (minute < 10) {
		minute = '0' + minute
	}

	return `${currDate} ${hour}:${minute}`
}

const Chat = ({ display, roomId, clickChat }) => {
	const currentUser = sessionStorage.getItem('user')
	const [msg, setMsg] = useState([])
	const messagesEndRef = useRef(null)
	const inputRef = useRef()

	useEffect(() => {
		socket.on('FE-receive-message', ({ msg, sender }) => {
			setMsg((msgs) => [...msgs, { sender, msg }])
		})
	}, [])

	// Scroll to Bottom of Message List
	useEffect(() => {
		scrollToBottom()
	}, [msg])

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
	}

	const sendMessage = (e) => {
		if (e.key === 'Enter') {
			const msg = e.target.value

			if (msg) {
				socket.emit('BE-send-message', { roomId, msg, sender: currentUser })
				inputRef.current.value = ''
			}
		}
	}

	return (
		<ChatContainer className={display ? '' : 'width0'}>
			<TopHeader>
				Tin nhắn trong cuộc gọi
				<ButtonClose onClick={clickChat}>X</ButtonClose>
			</TopHeader>

			<ChatArea>
				<MessageList>
					{msg &&
						msg.map(({ sender, msg }, idx) => {
							if (sender !== currentUser) {
								return (
									<Message key={idx}>
										<strong>Ai đó</strong>
										<p>{msg}</p>
									</Message>
								)
							} else {
								return (
									<UserMessage key={idx}>
										<strong>Me</strong>
										<p>
											{msg}
											<small>{formatDate(new Date())}</small>
										</p>
									</UserMessage>
								)
							}
						})}
					<div style={{ float: 'left', clear: 'both' }} ref={messagesEndRef} />
				</MessageList>
			</ChatArea>
			<BottomInput
				ref={inputRef}
				onKeyUp={sendMessage}
				placeholder="Nhập tin nhắn ở đây"
			/>
		</ChatContainer>
	)
}

const ButtonClose = styled.button`
	background-color: transparent;
	font-size: 14px;
	font-weight: 600;
	outline: none;
	border: none;
	margin-right: 30px;
	color: white;
	cursor: pointer;
`

const ChatContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 35%;
	hieght: 100%;
	transition: all 0.5s ease;
	overflow: hidden;
	background-color: #242f41;
`

const TopHeader = styled.div`
	width: 100%;
	margin: 15px;
	font-weight: 600;
	font-size: 18px;
	color: white;
	text-align: left;
	margin-left: 15px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const ChatArea = styled.div`
	width: 100%;
	height: 83%;
	max-height: 83%;
	overflow-x: hidden;
	overflow-y: auto;
`

const MessageList = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	padding: 15px;
	color: #454552;
`

const Message = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	font-size: 16px;
	margin-top: 15px;
	margin-left: 15px;
	text-align: left;

	> strong {
		color: white;
		margin-left: 3px;
	}

	> p {
		max-width: 65%;
		width: auto;
		padding: 9px;
		margin-top: 3px;
		margin-right: 30px;
		border: 1px solid rgb(78, 161, 211, 0.3);
		border-radius: 15px;
		background-color: #4ea1d3;
		color: white;
		font-size: 14px;
		text-align: left;
		display: flex;
		flex-direction: column;
	}
`

const UserMessage = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	width: 100%;
	font-size: 16px;
	margin-top: 15px;
	text-align: right;

	> strong {
		color: white;
		margin-right: 35px;
	}

	> p {
		max-width: 65%;
		width: auto;
		padding: 9px;
		margin-top: 3px;
		margin-right: 30px;
		border: 1px solid rgb(78, 161, 211, 0.3);
		border-radius: 15px;
		background-color: #4ea1d3;
		color: white;
		font-size: 14px;
		text-align: left;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		text-align: justify;
	}
`

const BottomInput = styled.input`
	margin: 15px;
	border-radius: 5px;
	bottom: 0;
	width: 100%;
	height: 8%;
	padding: 15px;
	border: 1px solid rgb(69, 69, 82, 0.25);
	box-sizing: border-box;
	opacity: 0.7;
	background-color: white;

	:focus {
		outline: none;
	}
`

export default Chat
