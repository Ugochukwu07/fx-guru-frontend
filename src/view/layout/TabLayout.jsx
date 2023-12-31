import Nav from '#/components/nav/Nav'
import PropTypes from 'prop-types';
import { motion } from "framer-motion"


import './tablayout.scss'
import ScrollToTop from '../../components/ScrollToTop';

TabLayout.propTypes = {
    children: PropTypes.node,
    nav: PropTypes.string
};

export default function TabLayout({children, nav}){
    return (
        <motion.div 
            className='layout'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
        >
            <ScrollToTop />
            <div className='mb-16' style={{flex: 1, minHeight: '135vh' }}>
                {children}
            </div>
            <Nav 
                home={(nav == 'home') && true} 
                assets={(nav == 'assets') && true} 
                trade={(nav == 'trade') && true} 
                exchange={(nav == 'exchange') && true} 
            />
        </motion.div>
    )
}
