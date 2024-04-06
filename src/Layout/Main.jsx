export const Main = ({children}) => {
    return(
        <main>
            <section className="hero mt-32">
                <div className="container w-[1450px] h-[auto] mx-auto">
                    {children}
                </div>
            </section>
        </main>
    )
}