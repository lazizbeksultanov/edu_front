import {Component} from "react";
import "./Card.css";

import {Col, Container, Row} from "reactstrap";

class Card extends Component {
    componentDidMount() {
        console.clear()
    }

    state = {
        object: '',
        columns: [
            {
                title: "leads",
                leads: [],
                sections: [
                    {
                        type: "section",
                        title: "instagram",
                        leads: [
                            {
                                type: "element",
                                name: "Azam",
                                phone: "909023487"
                            }
                        ],
                        expand: false
                    },
                    {
                        type: "section",
                        title: "🚶 Walked by",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "🌀 Website",
                        leads: [],
                        expand: true
                    }
                ]
            },
            {
                title: "expectation",
                leads: [],
                sections: [
                    {
                        type: "section",
                        title: "Probnniy dars uchun",
                        leads: [],
                        expand: false
                    },
                    {
                        type: "section",
                        leads: [
                            {
                                type: "element",
                                name: "Azam",
                                phone: "909023487"
                            },
                            {
                                type: "element",
                                name: "Azam",
                                phone: "909023487"
                            }
                        ],
                        expand: false,
                        title: "Test uchun"
                    },
                    {
                        type: "section",
                        title: "Boshlang'ich dasturlash",
                        leads: [],
                        expand: false
                    },
                    {
                        type: "section",
                        title: "Arab Tili",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "IELTS",
                        leads: [
                            {
                                type: "element",
                                name: "Abbos",
                                phone: "881880385",
                                comment: "Arab tili"
                            }
                        ]
                    },
                    {
                        type: "section",
                        title: "Pre-IELTS",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "Grammatika",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "English for beginner",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "Ingliz tili",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "Frontend dasturlash",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "Dasturlash",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "Boshlang'ich dasturlash",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "IELTS",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "Pre-IELTS",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "Grammatika",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "English for beginner",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "Ingliz tili",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "Frontend dasturlash",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "Dasturlash",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "Boshlang'ich dasturlash",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "IELTS",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "Pre-IELTS",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "Grammatika",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "English for beginner",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "Ingliz tili",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "Frontend dasturlash",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "Dasturlash",
                        leads: []
                    },
                    {
                        type: "section",
                        title: "Boshlang'ich dasturlash",
                        leads: []
                    }
                ]
            },
            {
                title: "set",
                leads: [],
                sections: [
                    {
                        type: "section",
                        leads: [
                            {
                                type: "element",
                                name: "Musaabir",
                                phone: "777777777"
                            },
                            {
                                type: "element",
                                name: "Yulduz",
                                phone: "944144828",
                                comment: "Arab"
                            }
                        ],
                        expand: false,
                        title: "probniy・Arab tili・Shamsuddin・Toq kunlar・11:00",
                        course_id: 296,
                        teacher: {
                            id: 16076,
                            owner: 1
                        },
                        days: 1,
                        lesson_start_time: "11:00"
                    },
                    {
                        type: "section",
                        leads: [
                            {
                                type: "element",
                                name: "Azam",
                                phone: "909023487",
                                comment: "Mmmm"
                            },
                            {
                                type: "element",
                                name: "Azam",
                                phone: "909023487"
                            },
                            {
                                type: "element",
                                name: "olloyor",
                                phone: "544545454",
                                comment: "tushunmayapman",
                                date_of_birth: "2021/01/9",
                                time: 3
                            },
                            {
                                type: "element",
                                name: "Azam",
                                phone: "909023487",
                                comment: "Gruppamga ustoz topila"
                            },
                            {
                                type: "element",
                                name: "O'quvchi O'quvchiyev",
                                phone: "972091307"
                            }
                        ],
                        expand: false,
                        title: "AD-G1・Boshlang'ich dasturlash・Javohir・Boshqa・09:00",
                        course_id: 283,
                        teacher: {
                            id: 16017,
                            owner: 1
                        },
                        days: 5,
                        lesson_start_time: "09:00"
                    }
                ]
            }
        ]
    }

    render() {
        const allowDrop = (e) => {
            e.preventDefault();
        }

        const drag = (e) => {
            this.setState({object: e.target.id})
            e.dataTransfer.setData("text", e.target.id);
        }

        const drop = (e) => {
            e.preventDefault();
            let data = e.dataTransfer.getData("text");
            e.target.appendChild(document.getElementById(data));
        }
        return (
            <section>
                <Container>
                    <Row>
                        {this.state.columns.map(item =>
                            <div className={"col"} id={item.title} onDrop={drop} onDragOver={allowDrop}>
                                <h1>{item.title} : {item.sections.length}</h1>
                                <hr/>
                                {item.sections ? item.sections.map(item2 =>
                                    <div className={item2.type}>
                                        <h6>{item2.title} : {item2.leads ? item2.leads.length : 0}</h6>
                                        <hr/>
                                        {item2.leads ? item2.leads.map((item3, i) =>
                                            <div className={item3.type} draggable={true} onDragStart={drag}
                                                 id={item.title + i}>
                                                {item.title === "expectation" ?
                                                    <div>
                                                        <button className='btn btn-secondary'>&nbsp;</button>
                                                        {" " + item3.name + " / " + item3.phone}
                                                    </div>
                                                    :
                                                    item3.name + " / " + item3.phone
                                                }
                                            </div>
                                        ) : ''}
                                    </div>
                                ) : ''}
                            </div>
                        )}
                    </Row>
                </Container>
            </section>
        )
    }

}

// {this.state.array.map((item, i) =>
//     <div id={item.id} onDrop={drop} onDragOver={allowDrop} className={"col square_div"}>
//         {item.objects.map((item2, i) =>
//             <img src={item2.img} draggable={true} onDragStart={drag} id={item2.id} alt={""}
//                  className={"section"}/>
//         )}
//     </div>
// )}

export default Card;


