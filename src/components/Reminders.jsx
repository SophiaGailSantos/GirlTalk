import {
  IconPill,
  IconBell,
  IconCheck,
  IconCalendar,
  IconClock,
  IconLock,
} from './icons.jsx'
import './Reminders.css'

const WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function Reminders() {
  return (
    <section id="reminders" className="section section-light reminders">
      <div className="container">
        <div className="reminders-head reveal">
          <span className="section-eyebrow">Reminders</span>
          <h2 className="section-title">
            Gentle nudges for
            <br />
            <em>what matters.</em>
          </h2>
          <p className="section-sub">
            Two kinds of reminders keep your routines on track — private,
            personal, and always under your control.
          </p>
        </div>

        <div className="reminders-grid">
          {/* Birth control reminders */}
          <article className="rem-card reveal">
            <div className="rem-card-top">
              <span className="rem-icon">
                <IconPill size={21} />
              </span>
              <span className="rem-badge">
                <IconLock size={12} />
                Private
              </span>
            </div>

            <h3>Birth Control Reminders</h3>
            <p className="rem-desc">
              Stay on top of your routine with personalized reminders.
            </p>

            <div className="rem-mock">
              <div className="notif">
                <span className="notif-icon" aria-hidden="true">
                  <IconPill size={15} />
                </span>
                <div className="notif-copy">
                  <strong>Birth control pill</strong>
                  <span>Today · 9:00 PM</span>
                </div>
                <span className="notif-status is-done">
                  <IconCheck size={11} />
                  Taken
                </span>
              </div>

              <div className="notif">
                <span className="notif-icon" aria-hidden="true">
                  <IconBell size={15} />
                </span>
                <div className="notif-copy">
                  <strong>Refill prescription</strong>
                  <span>Friday · 10:00 AM</span>
                </div>
                <span className="notif-status">Upcoming</span>
              </div>

              <div className="week-strip">
                <span className="week-label">This week</span>
                <div className="week-days" aria-hidden="true">
                  {WEEK.map((d, i) => (
                    <span
                      key={`${d}-${i}`}
                      className={`week-day ${i === 0 ? 'is-today is-done' : ''}`}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="rem-note">
              <IconLock size={14} />
              Only you can see your schedule — private and personal.
            </p>
          </article>

          {/* General health reminders */}
          <article className="rem-card reveal">
            <div className="rem-card-top">
              <span className="rem-icon">
                <IconBell size={21} />
              </span>
              <span className="rem-badge">
                <IconClock size={12} />
                Everyday
              </span>
            </div>

            <h3>General Health Reminders</h3>
            <p className="rem-desc">
              Keep track of everyday health routines, appointments, and
              important tasks.
            </p>

            <div className="rem-mock">
              <ul className="rem-list">
                <li className="is-done">
                  <span className="rem-box" aria-hidden="true">
                    <IconCheck size={11} />
                  </span>
                  <div className="rem-item-copy">
                    <strong>Take vitamin D</strong>
                    <span>8:00 AM · daily</span>
                  </div>
                </li>
                <li>
                  <span className="rem-box" aria-hidden="true" />
                  <div className="rem-item-copy">
                    <strong>Drink water</strong>
                    <span>1:00 PM · daily</span>
                  </div>
                </li>
                <li>
                  <span className="rem-box rem-box--date" aria-hidden="true">
                    <IconCalendar size={11} />
                  </span>
                  <div className="rem-item-copy">
                    <strong>Dr. appointment</strong>
                    <span>Thursday · 2:00 PM</span>
                  </div>
                </li>
                <li>
                  <span className="rem-box rem-box--date" aria-hidden="true">
                    <IconClock size={11} />
                  </span>
                  <div className="rem-item-copy">
                    <strong>Annual checkup</strong>
                    <span>November 3</span>
                  </div>
                </li>
              </ul>

              <div className="rem-tags" aria-hidden="true">
                <span>Medication</span>
                <span>Hydration</span>
                <span>Vitamins</span>
                <span>Appointments</span>
              </div>
            </div>

            <p className="rem-note">
              <IconClock size={14} />
              Set one-time or repeating reminders — whatever fits your routine.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
