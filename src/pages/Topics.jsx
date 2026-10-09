import Topics from '../components/Topics.jsx'

/*
 * The homepage "Health topics" explorer, available inside the signed-in app so
 * members can search and browse categories without leaving the app.
 */
export default function TopicsPage() {
  return (
    <div className="page topics-page">
      <Topics />
    </div>
  )
}