import { useState, FormEvent } from "react";

export default function Booking() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [phone, setPhone] = useState("");
    const [time, setTime] = useState("");
    const [people, setPeople] = useState(1);
    const [requests, setRequests] = useState("");
    const [submitted, setSubmitted] = useState(false);
  
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      // Basic validation:
      if(!name || !email || !date) {
        alert("Vul alstublieft alle verplichte velden in.");
        return;
      }
      // For now, simply log the booking request
      console.log("New booking request:", { name, email, phone, date, time, people, requests });
      setSubmitted(true);
    };
  
    if(submitted) {
      return <div className="p-4"><h2>Bedankt voor uw reservering!</h2><p>We nemen spoedig contact met u op om de reservering te bevestigen.</p></div>;
    }
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Naam *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border p-2" />
          </div>
          <div>
            <label className="block mb-1">Email *</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2" />
          </div>
          <div>
            <label className="block mb-1">Telefoon</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full border p-2" />
          </div>
          <div>
            <label className="block mb-1">Aantal personen</label>
            <input type="number" min="1" max="20" value={people} onChange={e => setPeople(Number(e.target.value))} className="w-full border p-2" />
          </div>
          <div>
            <label className="block mb-1">Datum *</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border p-2" />
          </div>
          <div>
            <label className="block mb-1">Tijd</label>
            <input type="time" value={time} onChange={e => setTime(e.target.value)} className="border p-2" />
          </div>
          <div>
            <label className="block mb-1">Bijzonderheden</label>
            <textarea value={requests} onChange={e => setRequests(e.target.value)} className="w-full border p-2" rows={3} placeholder="Dieetwensen, allergieën, etc."></textarea>
          </div>
          <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded">Verstuur</button>
        </form>

}

  
