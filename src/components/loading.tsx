export const Loading = () => {
    return (
        <div className="loading">
            <div className="wrapper-villagers">
                {[...Array(10)].map((n, index) => 
                    <div key={index} className="villager">
                        <div className="vi-image"></div>

                        <dl className="vi-info">
                            <dd></dd>
                            <dd></dd>
                            <dd></dd>
                            <dd></dd>
                        </dl>
                    </div>
                )}
            </div>
        </div>
    );
}