import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import css from './BookingForm.module.css';
export default function BookingForm() {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleSend = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!startDate) {
      toast.error('Please select a rental date', {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '12px',
          background: 'var(--white)',
          color: 'var(--main)',
          border: '1px solid #ef4444',
        },
      });
      return;
    }

    toast.success('Car successfully booked! We will contact you soon.', {
      duration: 4000,
      position: 'top-center',
      style: {
        background: 'var(--white)',
        color: 'var(--main)',
        border: '1px solid var(--button)',
        borderRadius: '12px',
      },
    });

    e.currentTarget.reset();
    setStartDate(null);
  };

  return (
    <form className={css.bookingForm} onSubmit={handleSend}>
      <h3 className={css.bookingFormTitle}>Book your car now</h3>
      <p className={css.bookingFormParagraph}>
        Stay connected! We are always ready to help you.
      </p>
      <div className={css.bookingContentWrapper}>
        <label id="name-label">
          <input
            id="name-input"
            type="text"
            placeholder="Name*"
            required
            className={css.bookingInput}
          />
        </label>
        <label id="email-label">
          <input
            id="email-input"
            type="email"
            placeholder="Email*"
            required
            className={css.bookingInput}
          />
        </label>

        <div className={css.datePickerWrapper}>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            placeholderText="Booking date"
            className={css.bookingInput}
            formatWeekDay={nameOfDay => nameOfDay.slice(0, 3)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            isClearable
            required
          />
        </div>

        <label id="textarea-label">
          <textarea
            id="comment-textarea"
            placeholder="Comment"
            className={css.bookingTextarea}
          ></textarea>
        </label>
      </div>

      <div className={css.bookingFormBtnWrapper}>
        <button type="submit" className={css.bookingFormBtn}>
          Send
        </button>
      </div>
    </form>
  );
}
