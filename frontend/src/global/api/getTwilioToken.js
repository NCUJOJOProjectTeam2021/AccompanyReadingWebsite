import Cookies from 'universal-cookie';


export default function getTwilioToken(username, roomname) {
    const cookies = new Cookies();

    const setupTwillo = (username, roomname) => {
        var formdata = new FormData();
        const datajson = {
            "username": username,
            "roomname": roomname,
        };
        formdata.append("username", username);
        formdata.append("roomname", roomname);

        var requestOptions = {
            method: 'Post',
            body: formdata,
            redirect: 'follow'
        }

        fetch('http://localhost:8000/api/token', requestOptions)
            .then(response => {
                return (response.json());
            })
            .then(data => {
                const twilioToken = data.token;
                // setState((state) => {
                //     console.log(twilioToken);
                //     return { ...state, device, twilioToken }
                // });
                // localStorage.setItem('device', JSON.stringify(device));
                // console.log(JSON.parse(localStorage.getItem("device")));
                // console.log(typeof (device));
                cookies.set('twilioToken', twilioToken);

            }).catch((error) => {
                console.log(error);
            })
    }
    setupTwillo(username, roomname);
    //get the access token
}