const Card = ({post} : {post: Card}) => {
  return (
    <li className="border-4 border-gray-300 rounded-md h-5 w-4">
        <div className="flex-between">
            <p>
                {post._createdAt}
            </p>
        </div>
    </li>
  )
}
export default Card