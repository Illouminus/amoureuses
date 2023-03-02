import React, { useState } from 'react'
import {useSession} from "next-auth/react";
import cls from './Articles.module.scss'
import deleteIcon from '../../../public/img/delete.png'
import editIcon from '../../../public/img/Edit.svg'
import Image from "next/image";

const Articles = ({ category, findId, setOpen, menu, deleteItem }) => {
	const {status, data} = useSession()


	return (
		<>
			<h2 className={cls.categoryName}>{category.name}</h2>
			{menu.map(item => category._id === item.category && (
				<div className={cls.link} key={item._id}>
					<li  className={cls.list}>{item.name}<span>{`${item.price} €`}</span></li>
					<div className={cls.butonsEditGroup}>
						{status === "authenticated" && <span onClick={() => {
							deleteItem(item._id)
						}}>
							<Image
								src={deleteIcon}
								alt="Icon of email"
								priority="high"
							/>
						</span>}
						{status === "authenticated" && <span className={cls.editSpan} onClick={() => {
							findId(item._id)
							setOpen(true)
						}}>
							<Image
								src={editIcon}
								alt="Icon of email"
								priority="high"
								className={cls.editIcon}
							/>
						</span>}
					</div>
				</div>
			))}
		</>
	)
}

export default Articles
