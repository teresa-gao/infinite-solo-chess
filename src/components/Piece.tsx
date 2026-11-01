interface PieceProps {
    abbreviation: string;
    isWhite: boolean;
}

export default function Piece({ abbreviation, isWhite }: PieceProps) {
    const color: string = isWhite ? "l" : "d";
    const imgUrl: string = new URL(`../assets/Chess_${abbreviation}${color}t60.png`, import.meta.url).href;
    return (
        <img src={imgUrl} className="piece" />
    )
}
