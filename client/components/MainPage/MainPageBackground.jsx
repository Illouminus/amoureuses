import cls from './MainPage.module.scss'
export const MainPageBackground = () => {
    return (
        <div className={cls.divBackground}>
        <div style={{
            backgroundImage: `url('/img/Bar.png')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
            height: '100%',
        }} />
        </div>
    )
}

