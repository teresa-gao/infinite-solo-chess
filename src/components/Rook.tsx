import Piece from './Piece.tsx'

interface RookProps {
    isWhite: boolean;
    dragId: string;
}

export default function Rook({ isWhite, dragId }: RookProps) {
    return (
        <Piece
            type="r"
            isWhite={isWhite}
            dragId={dragId}
        />
    )
}
