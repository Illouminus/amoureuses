import cls from '../styles/footer.module.css'
export const Footer =() =>  {
    return (
        <footer className={cls.footer}>
            <div className={cls.container}>
                <p>&copy; 2023 My Website</p>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
        </footer>
    )
}
