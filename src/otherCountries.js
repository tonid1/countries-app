import EngFlag from './eng-flag.jpg';
import ScoFlag from './ScoFlag.png';
import WelFlag from './WalFlag.png';
import IreFlag from './IreFlag.png';
import MacFlag from './MacFlag.svg';
import KorFlag from './KorFlag.svg';

const England = {
    name: 'England',
    capital: 'London',
    region: 'Europe',
    numericCode: 1878,
    flag: EngFlag
}

const Wales = {
    name: 'Wales',
    capital: 'Cardiff',
    region: 'Europe',
    numericCode: 1879,
    flag: WelFlag
}

const Scotland = {
    name: 'Scotland',
    capital: 'Edinburgh',
    region: 'Europe',
    numericCode: 1877,
    flag: ScoFlag
}

const NorthernIreland = {
    name: 'Northern Ireland',
    capital: 'Belfast',
    region: 'Europe',
    numericCode: 1876,
    flag: IreFlag
}

const NorthMacedonia = {
    name: 'North Macedonia',
    capital: 'Skopje',
    region: 'Europe',
    numericCode: 1875,
    flag: MacFlag
}

const NorthKorea = {
    name: 'North Korea',
    capital: 'Pyongyang',
    region: 'Asia',
    numericCode: 1874,
    flag: KorFlag
}

const OtherCountries = [England, Scotland, Wales, NorthernIreland, NorthMacedonia, NorthKorea]

export default OtherCountries