export const Main = ({children}) => {
    return(
        <main>
            <section className="hero mt-32 mb-96">
                <div className="container mx-auto">
                    {children}
                </div>
            </section>
        </main>
    )
}