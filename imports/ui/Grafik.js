import React from 'react';
import ReactDOM from 'react-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default function grafik( element, veri, sutunlar, xEkseni, genislik, yukseklik ){

        ReactDOM.render(
            
                        <BarChart width={ genislik } height={ yukseklik } data={ veri }>
                            <XAxis dataKey = { xEkseni } />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey = { sutunlar } fill="#006666" />
                        </BarChart>
            
        ,element);
    
}