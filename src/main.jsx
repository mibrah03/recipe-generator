import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import PrivacyPolicy from './PrivacyPolicy.jsx'
import About from './About.jsx'
import Contact from './Contact.jsx'
import Terms from './Terms.jsx'

const path = window.location.pathname;

const Component = 
  path === '/privacy' ? PrivacyPolicy : 
  path === '/about' ? About : 
  path === '/contact' ? Contact :
  path === '/terms' ? Terms :
  App;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>,
)
