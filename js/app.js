let editIndex = null;

async function loadCars() {

    try {

        const response = await fetch("data/cars.json");

        if (!response.ok) {
            throw new Error("Failed to load cars data");
        }

        const cars = await response.json();

        const carsContainer =
            document.getElementById("cars-container");

        let carsHTML = "";

        cars.forEach(car => {

            carsHTML += `

                <div class="col-lg-4 col-md-6">

                    <div class="car-card">

                        <img
                            src="${car.image}"
                            class="car-image"
                            alt="${car.name}"
                        >

                        <div class="car-content">

                            <h3 class="car-title">
                                ${car.name}
                            </h3>

                            <p class="car-price">
                                ${car.price}
                            </p>

                            <button
                                class="btn btn-warning"
                                onclick="selectCar('${car.name}')"
                            >
                                Rent Now
                            </button>

                        </div>

                    </div>

                </div>
            `;
        });

        carsContainer.innerHTML = carsHTML;

    } catch(error) {

        console.error("Error loading cars:", error);

        document.getElementById(
            "cars-container"
        ).innerHTML = `

            <div class="col-12 text-center">

                <p class="text-danger">
                    Failed to load cars.
                </p>

            </div>
        `;
    }
}

loadCars();

const reservationForm = document.getElementById("reservation-form");

reservationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const reservation = {

        fullName: document.getElementById("full-name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        car: document.getElementById("car-select").value,

        days: document.getElementById("days").value,

        transmission: document.querySelector(
            'input[name="transmission"]:checked'
        ).value,

        insurance: document.getElementById("insurance").checked,

        vip: document.getElementById("vip").checked,

        notes: document.getElementById("notes").value
    };

    if (editIndex === null) {

        saveReservation(reservation);

    } else {

        updateReservation(editIndex, reservation);

        editIndex = null;
    }

    displayReservations();

    alert("Reservation saved!");

    reservationForm.reset();
});

// Wyświetlenie kart rezerwacji
function displayReservations() {

    const reservationsContainer =
        document.getElementById(
            "reservations-container"
        );

    const reservations = getReservations();

    reservationsContainer.innerHTML = "";

    reservations.forEach((reservation, index) => {

        reservationsContainer.innerHTML += `

            <div class="col-lg-4">

                <div class="reservation-card">

                    <h3>
                        ${reservation.fullName}
                    </h3>

                    <p>
                        <strong>Car:</strong>
                        ${reservation.car}
                    </p>

                    <p>
                        <strong>Days:</strong>
                        ${reservation.days}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        ${reservation.phone}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${reservation.email}
                    </p>

                    <button
                        class="btn btn-warning mt-3 me-2"
                        onclick="editReservation(${index})"
                    >
                        Edit
                    </button>

                    <button
                        class="btn btn-danger mt-3"
                        onclick="deleteReservation(${index})"
                    >
                        Delete
                    </button>

                </div>

            </div>
        `;
    });
}

displayReservations();

function editReservation(index) {

    const reservations = getReservations();

    const reservation = reservations[index];

    document.getElementById("full-name").value =
        reservation.fullName;

    document.getElementById("email").value =
        reservation.email;

    document.getElementById("phone").value =
        reservation.phone;

    document.getElementById("car-select").value =
        reservation.car;

    document.getElementById("days").value =
        reservation.days;

    document.getElementById("notes").value =
        reservation.notes;

    editIndex = index;

    document
        .getElementById("reservation-section")
        .scrollIntoView({
            behavior: "smooth"
        });
}

function selectCar(carName) {

    const carSelect =
        document.getElementById("car-select");

    carSelect.value = carName;

    document
        .getElementById("reservation-section")
        .scrollIntoView({
            behavior: "smooth"
        });
}

