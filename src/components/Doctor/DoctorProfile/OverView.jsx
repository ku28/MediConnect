import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase } from "react-icons/fa";

const OverView = () => {
    return (
        <div className="col-md-12 col-lg-9">
            <div className='mb-3'>
                <h5 className='overview-text'>About Me</h5>
                <p className='text-secondary'>I am a dedicated gynecologist with over 5 years of experience in women's health. My passion lies in providing comprehensive care to women of all ages, ensuring their reproductive health and well-being. I specialize in prenatal care, childbirth, and the diagnosis and treatment of disorders related to the female reproductive system.</p>
            </div>
            <div>
                <h5 className='overview-text'>Services</h5>
                <p className='text-secondary'>Prenatal Care, Childbirth, Reproductive Health, Minimally Invasive Surgery, Menopause Management, Contraceptive Counseling</p>
            </div>
            <div>
                <h5 className='overview-text'>Specializations</h5>
                <p className='text-secondary'>Obstetrics, Gynecology, Reproductive Endocrinology, Minimally Invasive Surgery, Menopause Management, Contraceptive Counseling</p>
            </div>
            <div>
                <h5 className='overview-text'>Education</h5>
                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#50C878', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  #50C878' }}
                        date="2018 - 2019"
                        iconStyle={{ background: '#50C878', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">Medical University</h5>
                        <h6 className="text-white">India</h6>
                        <p style={{ fontSize: '14px' }}>
                            Obstetrics and Gynecology, Women's Health, Reproductive Endocrinology, Minimally Invasive Surgery
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#50C878', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  #50C878' }}
                        date="2020 - 2021"
                        iconStyle={{ background: '#50C878', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">Medical University</h5>
                        <h6 className="text-white">India</h6>
                        <p style={{ fontSize: '14px' }}>
                            Obstetrics and Gynecology, Women's Health, Reproductive Endocrinology, Minimally Invasive Surgery
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </div>
            <div className='my-5'>
                <h5 className='overview-text'>Work & Experience</h5>
                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#50C878', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  #50C878' }}
                        date="2021 - 2023 (2 years)"
                        iconStyle={{ background: '#50C878', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">Women's Health Clinic</h5>
                        <h6 className="text-white">India</h6>
                        <p style={{ fontSize: '14px' }}>
                            Obstetrics and Gynecology, Women's Health, Reproductive Endocrinology, Minimally Invasive Surgery
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#50C878', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  #50C878' }}
                        date="2023 - Present (1 years)"
                        iconStyle={{ background: '#50C878', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">Family Health Clinic</h5>
                        <h6 className="text-white">India</h6>
                        <p style={{ fontSize: '14px' }}>
                            Obstetrics and Gynecology, Women's Health, Reproductive Endocrinology, Minimally Invasive Surgery
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </div>
            <div>
                <h5 className='overview-text'>Awards</h5>
                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#50C878', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  #50C878' }}
                        date="July 2021"
                        iconStyle={{ background: '#50C878', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">Humanitarian Award</h5>
                        <h6 className="text-white">India</h6>
                        <p style={{ fontSize: '14px' }}>Obstetrics and Gynecology, Women's Health, Reproductive Endocrinology, Minimally Invasive Surgery</p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#50C878', color: '#00' }}
                        contentArrowStyle={{ borderRight: '7px solid  #50C878' }}
                        date="March 2023"
                        iconStyle={{ background: '#50C878', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">The Medical Professional of The Year Award</h5>
                        <h6 className="text-white">India</h6>
                        <p style={{ fontSize: '14px' }}>Obstetrics and Gynecology, Women's Health, Reproductive Endocrinology, Minimally Invasive Surgery</p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </div>
        </div>
    )
}
export default OverView;