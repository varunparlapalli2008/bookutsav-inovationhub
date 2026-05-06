// Futuristic Event Platform - Booking and Payment Logic

document.addEventListener('DOMContentLoaded', () => {

  // --- Seat Selection Logic ---
  const seatMap = document.getElementById('seatMap');
  const selectedSeatsDisplay = document.getElementById('selectedSeats');
  const totalPriceDisplay = document.getElementById('totalPrice');
  const checkoutBtn = document.getElementById('checkoutBtn');
  
  let selectedSeats = [];
  const basePrice = parseInt(localStorage.getItem('currentEventPrice') || '100');
  
  if (seatMap) {
    // Generate Fake Seats
    for (let i = 0; i < 40; i++) {
      const seat = document.createElement('div');
      seat.className = 'seat';
      
      // Randomly assign some seats as booked or VIP
      const rand = Math.random();
      if (rand < 0.2) {
        seat.classList.add('booked');
      } else if (rand > 0.8) {
        seat.classList.add('vip');
        seat.dataset.price = basePrice * 2;
      } else {
        seat.dataset.price = basePrice;
      }
      
      seat.dataset.id = `S-${i+1}`;
      
      seat.addEventListener('click', () => {
        if (seat.classList.contains('booked')) return;
        
        if (seat.classList.contains('selected')) {
          seat.classList.remove('selected');
          selectedSeats = selectedSeats.filter(s => s.id !== seat.dataset.id);
        } else {
          seat.classList.add('selected');
          selectedSeats.push({
            id: seat.dataset.id,
            price: parseInt(seat.dataset.price)
          });
        }
        updateBookingSummary();
      });
      
      seatMap.appendChild(seat);
    }
  }

  function updateBookingSummary() {
    if (!selectedSeatsDisplay || !totalPriceDisplay) return;
    
    if (selectedSeats.length === 0) {
      selectedSeatsDisplay.textContent = 'None';
      totalPriceDisplay.textContent = '$0';
      if(checkoutBtn) checkoutBtn.disabled = true;
      return;
    }
    
    selectedSeatsDisplay.textContent = selectedSeats.map(s => s.id).join(', ');
    const total = selectedSeats.reduce((sum, s) => sum + s.price, 0);
    totalPriceDisplay.textContent = `$${total}`;
    if(checkoutBtn) checkoutBtn.disabled = false;
    
    // Save to session for payment page
    sessionStorage.setItem('pendingBooking', JSON.stringify({
      seats: selectedSeats,
      total: total
    }));
  }

  if(checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      window.location.href = 'payment.html';
    });
  }

  // --- Payment Flow Logic ---
  const paymentMethodTabs = document.querySelectorAll('.payment-tab');
  const paymentForms = document.querySelectorAll('.payment-form');
  const payBtn = document.getElementById('payBtn');
  
  if (paymentMethodTabs.length > 0) {
    // Set amounts
    const pending = JSON.parse(sessionStorage.getItem('pendingBooking') || '{"total": 0}');
    document.querySelectorAll('.final-amount').forEach(el => {
      el.textContent = `$${pending.total}`;
    });

    paymentMethodTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class
        paymentMethodTabs.forEach(t => t.classList.remove('active'));
        paymentForms.forEach(f => f.classList.remove('active'));
        
        // Add active class
        tab.classList.add('active');
        document.getElementById(`form-${tab.dataset.method}`).classList.add('active');
      });
    });
  }

  if (payBtn) {
    payBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Fake processing
      payBtn.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;margin:auto;"></div> Processing...';
      payBtn.disabled = true;
      
      setTimeout(() => {
        // Record booking
        const pending = JSON.parse(sessionStorage.getItem('pendingBooking') || '{}');
        const eventId = localStorage.getItem('currentEventId') || 'evt_1';
        const event = window.dataManager.getEventById(eventId) || { title: 'Unknown Event' };
        
        window.dataManager.addBooking({
          eventId: eventId,
          eventTitle: event.title,
          amount: pending.total,
          seats: pending.seats ? pending.seats.map(s => s.id) : [],
          status: 'Confirmed'
        });
        
        sessionStorage.removeItem('pendingBooking');
        window.location.href = 'success.html';
      }, 2500);
    });
  }

});
