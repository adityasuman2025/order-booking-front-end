import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import { api_url_address, cookie_expiration_time, encryption_key } from "./global"
const cookies = new Cookies();
const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
