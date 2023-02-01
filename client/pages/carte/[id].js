import { useRouter } from "next/router"
export default function () {
	const { query } = useRouter()
	return (
			<h1>Одно значение меню c id {query.id} </h1>
	)
}