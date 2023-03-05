import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import {ContactForm} from "./ContactForm";
import Map from "./Map";


const style = {
	position: 'absolute',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	borderRadius: '10px',
	p: 4,
};

const styleContactForm = {
	position: 'absolute',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	top: '50%',
	left: '50%',
	width: '90vw',
	height: '90vh',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'rgba(194,167,135,0.9)',
	border: '2px solid #000',
	boxShadow: 24,
	borderRadius: '10px',
	p: 4,
	overflow: 'hidden'
};

const styleButton = {
	bgcolor: 'none'
}

const modal = ({ open, handleClose, menuItem, setMenuItem, edditOrAdd, isContactForm }) => {
	const [newItem, setnewItem] = useState({
		id: '',
		name: '',
		price: 0,
		category: '',
		description: '',
		origin: ''
	})

	useEffect(() => {
		if (menuItem) {
			setnewItem({
				...newItem,
				id: menuItem._id,
				name: menuItem.name,
				price: menuItem.price,
				category: menuItem.category,
				description: menuItem.description,
				origin: menuItem.origin
			})
		}


	}, [menuItem])

	const newItemHandler = (e) => {
		setnewItem({ ...newItem, [e.target.name]: e.target.value })
	}

	const sendNewItem = () => {
		edditOrAdd(newItem)
		setMenuItem({})
		setnewItem({
			id: '',
			name: '',
			price: 0,
			category: '',
			description: '',
			origin: ''
		})
	}

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			{ isContactForm ?
				<Box sx={styleContactForm}>
				<ContactForm />
					<Map />
				</Box>
				:
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
					</Typography>
					<TextField id="filled-basic" label="Category" variant="filled" required={true} size="small" style={{ margin: '10px' }} name='category' onChange={newItemHandler} defaultValue={menuItem.category} />
					<TextField id="filled-basic" label="Name" variant="filled" required={true} size="small" style={{ margin: '10px' }} name='name' onChange={newItemHandler} defaultValue={menuItem.name} />
					<TextField id="filled-basic" label="Price" variant="filled" required={true} size="small" style={{ margin: '10px' }} name='price' onChange={newItemHandler} defaultValue={menuItem.price} />
					<TextField id="filled-basic" label="Origin" variant="filled" size="small" style={{ margin: '10px' }} name='origin' onChange={newItemHandler} defaultValue={menuItem.origin} />
					<TextField id="outlined-multiline-flexible" label="Description" style={{ margin: '10px' }} multiline name='description' onChange={newItemHandler} defaultValue={menuItem.description} />
					<Stack direction="row" spacing={2}>
						<Button variant="contained" endIcon={<SendIcon />} sx={styleButton} className='button__menu' onClick={() => {
							sendNewItem()
							handleClose()
						}}>Send</Button>
					</Stack>
				</Box>
			}

		</Modal>

	)
}

export default modal
