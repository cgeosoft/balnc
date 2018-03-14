# reservation Flows

## Reservation with partial payment in advance

    -  30% payment in advance 
    -  30% refund 14 days before start

- customer creates reservation with status draft [item:$50]
- customer updates reservation status to finished [total:$50]
- owner updates reservation status to confirmed
- owner requests partial payment in advance [$15]
- system generates invoice [$15]
- system charges customer [$15]
- system updates reservation status to partial paid
- [time pass over cancel date]
- owner requests full payment [$35]
- system generates invoice [$35]
- system charges customer [$35]
- system updates reservation status to full paid
- [time pass and user use product]
- owner updates reservation status to complete

## Canceled reservation with refund

    -  100% payment in advance 
    -  50% refund 14 days before start

- customer creates reservation with status draft [item:$50]
- customer updates reservation status to finished [total:$50]
- owner updates reservation status to confirmed
- owner requests full payment in advance [$50]
- system generates invoice [$50]
- system charges customer [$50]
- system updates reservation status to full paid
- [time pass over cancel date]
- owner requests cancelation
- system generates invoice [-$25]
- system refund customer [$25]
- system updates reservation status to canceled

## Canceled reservation with no refund

    -  100% payment in advance 
    -  0% refund 0 days before start

- customer creates reservation with status draft
- customer updates reservation status to finished
- owner updates reservation status to confirmed
- owner requests full payment in advance
- system generates invoice
- system charges customer
- system updates reservation status to full paid
- [time pass]
- owner requests cancelation
- system updates reservation status to canceled

## Canceled reservation with refund of in advanced payment

    -  50% payment in advance 
    -  50% refund 0 days before start

- customer creates reservation with status draft [item:$50]
- customer updates reservation status to finished [total:$50]
- owner updates reservation status to confirmed
- owner requests partial payment in advance [$25]
- system generates invoice [$25]
- system charges customer [$25]
- system updates reservation status to partial paid
- [time pass]
- owner requests cancelation
- system generates invoice [$0]
- system updates reservation status to canceled