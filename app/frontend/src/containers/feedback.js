import React from 'react';


class Feedback extends React.Component {

    render() {
        return(
            <div>
                <h1>Спасибо за пользование сервисом!</h1>
                <p>Я приложил усилия, чтобы обеспечить отказоустойчивость, автономность и некоторую расширяемость сервиса</p>
                <p>Однако, нельзя предусмотреть все. Вещи, которые стоило бы покрыть тестами, не покрыты. О некоторых полезных паттернах я, возможно, даже не догадываюсь.</p>
                <p>К тому же, у меня нет собственной команды QA, чтобы свести возможные баги к абсолютному минимуму</p>
                <p>А проект мне всё ещё интересен. Поэтому, какое-то время я точно буду его поддерживать. В свободное время и в качестве хобби. Хотя и возможности у меня будут ограничены</p>
                <p>Баг-репорты и фич-реквесты оформлять в виде тикетов по <a href="https://gitlab.sima-land.ru/oleg_kotov/marketing_automation/issues" rel="noopener noreferrer" target="blank">ссылке</a></p>
                <p>Прочий фидбек можно слать в скайп <span style={{color: 'green'}}>live:kotov_or_sima</span> или на почту <span style={{color: 'green'}}>tesfnatic123@gmail.com</span></p>
            </div>
        )
    }
}

export default Feedback;