

const SubCard = ({ sub }) => {
    console.log("sub was", sub);
    return (
        <div className="w-full border-b border-gray-400 text-left py-4">
            <a href = {`/r/${sub.subredditname}/`}>
                {sub.subredditname}
            </a>
        </div>
    );
};

export default SubCard;