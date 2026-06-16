function saveReservation(reservation) {

    let reservations = [];

    const storedReservations = localStorage.getItem("reservations");

    if (storedReservations) {

        reservations = JSON.parse(storedReservations);
    }

    reservations.push(reservation);

    localStorage.setItem(
        "reservations",
        JSON.stringify(reservations)
    );
}

function getReservations() {

    const reservations =
        localStorage.getItem("reservations");

    if (reservations) {

        return JSON.parse(reservations);
    }

    return [];
}

function deleteReservation(index) {

    let reservations = getReservations();

    reservations.splice(index, 1);

    localStorage.setItem(
        "reservations",
        JSON.stringify(reservations)
    );

    displayReservations();
}

function updateReservation(index, updatedReservation) {

    let reservations = getReservations();

    reservations[index] = updatedReservation;

    localStorage.setItem(
        "reservations",
        JSON.stringify(reservations)
    );

    displayReservations();
}