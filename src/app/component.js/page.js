export default function YourComponent({style, item, dayIndex, daysTotal}) {
   return (
       <div style={{
           ...style, // apply calculated styles, be careful not to override these accidentally (unless you know what you are doing)
           backgroundColor: 'red',
           borderRadius: 10,
           elevation: 5,
       }}>
           <p>{item.title}</p>
           <p>{dayIndex} of {daysTotal}</p>
       </div>
   );
}